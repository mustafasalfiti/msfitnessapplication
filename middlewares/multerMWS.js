export const storageMember = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null  , req.user.username + Date.now());
  },
  destination: (req, file, cb) => {
    let dir = path.join(__dirname + `./client/public/uploads/members/${user}`)
    let existsPhotoFile = path.join(__dirname + `/members/${user}/${req.user.image}`);
    try {
      isExist = path.join(__dirname + `./client/public/uploads/members/${user}`);
      if (isExist) {
        fs.unlink(existsPhotoFile , (err)=>console.log(err));
        cb(null , dir )
      } else {
        fs.mkdirSync(dir);
        cb(null , dir )
      }
    } catch (err) {
      console.log(err);
    }
  }
});
