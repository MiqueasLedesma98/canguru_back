const { join } = require("path");

const { v4: uuid } = require("uuid");

const defaultExtensions = ["jpg", "png", "jpeg", "webp"];

module.exports = {
  uploadFile: ({ files, validExtensions = defaultExtensions, folder = "" }) =>
    new Promise((resolve, reject) => {
      const { img } = files;

      if (!img) reject("No hay archivo que subir!");

      const extension = img.name.split(".").pop();

      if (!validExtensions.includes(extension))
        reject(`La extension ${extension} no es permitida`);

      const tempName = uuid() + "." + extension;

      const uploadPath = join(__dirname, "../uploads", folder, tempName);

      img.mv(uploadPath, (err) => {
        if (err) return reject(err);
        resolve(tempName);
      });
    }),
};
