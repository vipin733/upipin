export const getCurrentBaseUrl = (req) => {
    const nextRequestMeta = req[Reflect.ownKeys(req).find(
        (s) => String(s) === "Symbol(NextRequestMeta)"
    )]
    return nextRequestMeta
}