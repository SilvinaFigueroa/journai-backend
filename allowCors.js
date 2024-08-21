

const allowCors = (routeHandler, origin) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
   
    if (req.method === 'OPTIONS') { // handle preflight requests
      res.status(200).end()
      return
    }
    return await routeHandler(req, res)
  }
  
  export default allowCors
  