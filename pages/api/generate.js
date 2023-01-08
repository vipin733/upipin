import { _createPaymentUrl } from "../../lib/generateUrl"
export default async function handler(req, res) {
  try {
    let {amount, mobile, merchant_id, bank, merchant_name} = req.body
    if (!amount || !mobile || !merchant_id || !bank || !merchant_name) {
      return res.status(400).json({ message: "request not valid"})
    }
    let encryption = await _createPaymentUrl({amount, mobile, merchant_id, bank, merchant_name})
    let paymentUrl = `${process.env.BASE_URL}/${encryption}`
    res.status(200).json({status: true,  payment_url: paymentUrl})
  } catch (error) {
    return res.status(500).json({ message: "server error" , error})
  }
}

