
class profiles{
    static async picture(req, res){
        if (!req.file) {
            return res.status(400).json({error: 'No file uploaded.'});
          }
          res.status(200).json({message: `File uploaded successfully: ${req.file.filename}`});
    }

}


export default profiles;