import moment from "moment"
import { decryptPin, _csrfTokenDecode } from "../../lib/hashing"

export default function handler(req, res) {
  try {
    let token = _csrfTokenDecode(req.body._csrf)
    let startTime = moment(token.time)
    let nowTime = moment()
    let duration = moment.duration(nowTime.diff(startTime));
    let pin = decryptPin(req.body.pin)

    if (duration.asMinutes() > 5 || token.domain != req.headers.host) {
      return res.status(500).json({message:"server error"})
    }

    setTimeout(() => {
      res.status(200).json({token, pin, duration:  duration.asMinutes(), startTime, host: req.headers.host, requestBody:req.body })
    }, 5000);
  } catch (error) {
    return res.status(500).json({message:"server error"})
  }
}
