import { _createPaymentUrl } from "../../lib/generateUrl"
// import { getCurrentBaseUrl } from "../../lib/helper";
// import url from "url"
export default async function handler(req, res) {
  // try {
    let {amount, mobile, merchant_id, bank, merchant_name} = req.body
    if (!amount || !mobile || !merchant_id || !bank || !merchant_name) {
      return res.status(400).json({ message: "request not valid"})
    }
    let encryption = await _createPaymentUrl({amount, mobile, merchant_id, bank, merchant_name})
    // let urldata = new url.URL(getCurrentBaseUrl(req).__NEXT_INIT_URL)
    // let paymentUrl = `${urldata.origin}/${encryption}`
    let paymentUrl = encryption
    res.status(200).json({status: true,  payment_url: paymentUrl})
  // } catch (error) {
  //   return res.status(500).json({ message: "server error" , error})
  // }
}

