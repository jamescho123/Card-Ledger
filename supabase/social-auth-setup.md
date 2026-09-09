# Card Ledger social and phone authentication

Provider secrets must remain in Supabase and must never be added to the web or iOS client. As of July 26, 2026, the live project reports phone authentication as disabled and does not expose a `custom:wechat` provider. The clients therefore show a configuration message instead of claiming that an SMS or WeChat authorization succeeded.

## 1. Mainland China phone OTP

The iOS app accepts a mainland number with or without `+86` and sends it to Supabase in E.164 format, for example `138 0000 0000` becomes `+8613800000000`.

1. In Supabase Dashboard, open **Authentication > Sign In / Providers > Phone**.
2. Enable phone authentication.
3. Configure an SMS provider that can reliably deliver OTP messages to mainland China.
4. If the built-in provider cannot deliver in China, use a Supabase **Send SMS Auth Hook** backed by a server-side Tencent Cloud or Aliyun SMS function.
5. Keep SMS credentials in the server-side provider or Edge Function secrets.
6. Test with a real `+86` number and review the Auth logs if delivery fails.

The clients send sign-in codes through `/auth/v1/otp` and verify them through `/auth/v1/verify`.

## 2. Native iOS WeChat authorization

The iOS target includes the official WeChat OpenSDK. Tapping **Continue in WeChat** will leave Card Ledger, open the installed WeChat app, request permission, and return through the app callback after the following configuration is complete.

1. Create and approve an iOS mobile application in the WeChat Open Platform.
2. Obtain its `wx...` App ID and client secret.
3. Register an HTTPS Universal Link for the iOS app and add the matching `applinks:<domain>` Associated Domain in Xcode.
4. Replace the placeholder `WECHAT_APP_ID` and `WECHAT_UNIVERSAL_LINK` build settings in `CardLedger.xcodeproj`.
5. Keep the WeChat client secret out of the app.
6. In Supabase Dashboard, open **Authentication > Sign In / Providers > Add Custom OAuth Provider**.
7. Use provider ID `wechat`; Card Ledger requests it as `custom:wechat`.
8. Configure the current WeChat authorization, token, and user-info endpoints with the same App ID and secret.
9. Add the callback URL shown by Supabase to the WeChat application.
10. Add `cardledger://auth-callback` to **Authentication > URL Configuration > Redirect URLs**.
11. Build and install the app on a physical iPhone with WeChat installed and signed in. The iOS Simulator cannot test WeChat app-to-app authorization.

## 3. Web WeChat and QQ OAuth

The browser can use redirect-based custom OAuth after the matching providers are enabled:

1. Create a WeChat website application or QQ Connect website application.
2. Add a Supabase custom OAuth provider with ID `wechat` or `qq`.
3. Enter the provider's current authorization, token, and user-info endpoints.
4. Allow accounts without email when the provider does not return one.
5. Add the Supabase callback URL to the provider application.

## 4. Redirect and identity-link settings

1. Add `http://127.0.0.1:4180/index.html?auth_return=1` for local browser testing.
2. Add the production HTTPS callback before deployment.
3. Enable **Manual Identity Linking** in Supabase if a signed-in user should connect phone, WeChat, or QQ to the same account.
4. Test a new login and identity linking separately.

Supabase stores provider identities on the Auth user. The `public.profiles` table remains keyed by `auth.users.id`, so linked email, phone, WeChat, and QQ identities open the same Card Ledger profile.
