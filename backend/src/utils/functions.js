exports.EncodeBase64 = data => {
  return Buffer.from(data).toString("base64");
};
exports.DecodeBase64 = data => {

  let buff = Buffer.from(data, "base64");
  return buff.toString("utf-8");
};
