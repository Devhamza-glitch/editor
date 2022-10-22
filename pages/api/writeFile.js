import fs from "fs";
import path from "path";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const files = fs.readdirSync(path.join("folder"));
    fs.writeFileSync( path.join("folder/", files[0]), req?.body.slice(10))
    res.status(200).send("Edited successfully") 

  };