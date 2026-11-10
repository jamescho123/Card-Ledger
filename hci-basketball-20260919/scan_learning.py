"""Local, explicitly confirmed visual examples. Original HCI files stay untouched."""
import hashlib
import sqlite3
import time


def connect(path):
    db = sqlite3.connect(path, timeout=15)
    db.execute('''CREATE TABLE IF NOT EXISTS examples (
        scope TEXT NOT NULL, fingerprint TEXT NOT NULL, hci_id TEXT NOT NULL,
        signature BLOB NOT NULL, updated REAL NOT NULL,
        PRIMARY KEY (scope, fingerprint))''')
    return db


def fingerprint(image):
    return hashlib.sha256(image.convert('RGB').tobytes() + str(image.size).encode()).hexdigest()


def validate_scope(scope):
    if not isinstance(scope, str) or len(scope) != 64 or any(c not in '0123456789abcdef' for c in scope):
        raise ValueError('A valid private learning scope is required')
    return scope


def remember(path, scope, image, hci_id, signature):
    validate_scope(scope)
    with connect(path) as db:
        db.execute('INSERT OR REPLACE INTO examples VALUES (?,?,?,?,?)',
                   (scope, fingerprint(image), hci_id, signature, time.time()))
        # Bound local storage and lookup cost independently for each user.
        db.execute('''DELETE FROM examples WHERE scope=? AND fingerprint NOT IN
            (SELECT fingerprint FROM examples WHERE scope=? ORDER BY updated DESC LIMIT 2000)''', (scope, scope))


def nearest(path, scope, image, signatures, score):
    if not scope or not path.exists():
        return None
    validate_scope(scope)
    with connect(path) as db:
        rows = db.execute('SELECT fingerprint,hci_id,signature FROM examples WHERE scope=?', (scope,)).fetchall()
    exact = fingerprint(image)
    ranked = {}
    for digest, card_id, signature in rows:
        if digest == exact:
            return {'id': card_id, 'score': .995, 'exact': True}
        similarity = max(score(query, signature) for query in signatures)
        ranked[card_id] = max(ranked.get(card_id, 0), similarity)
    ordered = sorted(ranked.items(), key=lambda item: item[1], reverse=True)
    if not ordered:
        return None
    card_id, similarity = ordered[0]
    runner_up = ordered[1][1] if len(ordered) > 1 else 0
    # Near-identical templates/parallels must not be learned as interchangeable.
    if similarity < .985 or similarity - runner_up < .025:
        return None
    return {'id': card_id, 'score': .97, 'exact': False}
