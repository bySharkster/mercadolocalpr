import { createClient } from "@supabase/supabase-js";
import multiparty from "multiparty";
import fs from "fs";
import mime from "mime-types";

const bucketName = "mercadolocalpr";

const supabaseUrl = "your-supabase-url";
const supabaseKey = "your-supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handle(req: any, res: any) {
  const form = new multiparty.Form();
  const { fields, files }: any = await new Promise((resolve, reject) => {
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log("length:", files.file.length);
  const links = [];
  for (const file of files.file) {
    const fileData = fs.readFileSync(file.path);
    const fileName = file.originalFilename;
    const fileType = mime.lookup(fileName);

    if (!fileType) {
      throw new Error('Invalid file type');
    }

    const { error } = await supabase.storage.from(bucketName).upload(fileName, fileData, {
      contentType: fileType,
    });

    if (error) {
      throw error;
    }

    links.push(`https://${bucketName}.supabase.co/${fileName}`);
  }

  res.json({ links });
}