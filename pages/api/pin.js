import moment from "moment"
import { decryptPin, _csrfTokenDecode } from "../../lib/hashing"
import { EncryptWithAES } from "../../lib/encryption"
import axios from "axios"


export default async function handler(req, res) {
  try {
    let token = _csrfTokenDecode(req.body._csrf)
    let startTime = moment(token.time)
    let nowTime = moment()
    let duration = moment.duration(nowTime.diff(startTime));
    let pin = decryptPin(req.body.pin)

    if (duration.asMinutes() > 5 || token.domain != req.headers.host) {
      return res.status(500).json({ message: "server error" })
    }

    pin = EncryptWithAES(pin)

    let data = {
      end: false,
      data: {
        mobile: "9164186611",
        // pin: "RAeA5uuet8jiKHixZ5UWwKL2K8uO2M1FZQst5M+GzTA=", 
        pin, 
        merchant_id: "0000104427", 
        amount: "1"
      }
    }
    console.log(data);

    let response = await axios.post(process.env.URL, data)
    res.status(200).json({...response.data })

  } catch (error) {
    return res.status(500).json({ message: "server error" , error: error.response.data})
  }
}

