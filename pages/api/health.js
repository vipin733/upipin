export default async function handler(req, res) {
  try {
    res.status(200).json({status: true})
  } catch (error) {
    return res.status(500).json({ message: "server error" , error})
  }
}