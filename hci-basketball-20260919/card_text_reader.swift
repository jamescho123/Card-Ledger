import Foundation
import Vision
import ImageIO

guard CommandLine.arguments.count == 2,
      let source = CGImageSourceCreateWithURL(URL(fileURLWithPath: CommandLine.arguments[1]) as CFURL, nil),
      let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else { exit(1) }
var results: [[String: Any]] = []
for (degrees, orientation) in [(0, CGImagePropertyOrientation.up), (90, .right), (180, .down), (270, .left)] {
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["en-US"]
    request.usesLanguageCorrection = false
    request.minimumTextHeight = 0.009
    try VNImageRequestHandler(cgImage: image, orientation: orientation).perform([request])
    let lines = (request.results ?? []).compactMap { $0.topCandidates(1).first }.filter { $0.confidence > 0.25 }.map { $0.string }
    results.append(["rotation": degrees, "text": lines.joined(separator: "\n")])
}
let data = try JSONSerialization.data(withJSONObject: ["orientations": results])
FileHandle.standardOutput.write(data)
