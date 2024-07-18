const fs = require("fs");
const { join } = require("path");
const { uploadFile } = require("../helpers");
const { response } = require("express");

const placeholderPath = join(__dirname, "../assets", "no-image.jpg");

// TODO: Cambiarlo para que funcione con solo model.img type string

module.exports = {
  uploadFile: async (req, res, next) => {
    try {
      const { collection, id } = req.params;

      const collectionModel = require(`../models/${collection + ".model"}`);

      const model = await collectionModel.findById(id);

      if (!model) throw new Error("No se encontro el registro");

      const name = await uploadFile({ files: req.files, folder: collection });

      const url = `/uploads/${collection}/${name}`;

      if (Array.isArray(model.img)) {
        model.img = [...model.img, url];
      } else {
        const imgPath = join(__dirname, "..", ...model.img.split("/"));
        const exists = fs.existsSync(imgPath);

        if (exists) fs.unlinkSync(exists);
        model.img = url;
      }

      await model.save();

      return res
        .status(200)
        .json({ msg: "Se ha subido la imagen correctamente", url });
    } catch (error) {
      next(error);
    }
  },
  showImage: async (req, res = response, next) => {
    try {
      const { collection = "", name } = req.params;

      const pathImg = join(__dirname, "../uploads", collection, name);

      const exists = fs.existsSync(pathImg);

      if (!exists) return res.sendFile(placeholderPath);
      else return res.sendFile(pathImg);
    } catch (error) {
      next(error);
    }
  },
  deleteImage: async (req, res, next) => {
    try {
      const { collection, name } = req.params;

      const imgPath = join(__dirname, "../uploads", collection, name);

      const exists = fs.existsSync(imgPath);

      if (!exists) throw new Error("El archivo no existe");

      fs.unlinkSync(imgPath);

      if (collection === "user") {
        await require(`../models/${collection + ".model"}`).findOneAndUpdate(
          { img: name },
          { $unset: { img: 1 } }
        );
      }

      return res.send({ msg: "Imagen eliminada con éxito" });
    } catch (error) {
      next(error);
    }
  },
};
