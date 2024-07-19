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

      const { img: img_model } = await collectionModel
        .findById(id)
        .select(["img"])
        .lean();

      const name = await uploadFile({ files: req.files, folder: collection });

      const current_file_path =
        img_model && join(__dirname, "..", ...img_model.split("/"));

      if (current_file_path) {
        const exists = fs.existsSync(current_file_path);
        if (exists) {
          fs.unlinkSync(current_file_path);
        }
      }

      const doc = await collectionModel.findById(id);

      const url = `/uploads/${collection}/${name}`;

      doc.img = url;

      await doc.save();

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
      const { collection, id } = req.params;

      const model = require(`../models/${collection + ".model"}`);

      const { img: model_img } = await model
        .findById(id)
        .select(["img"])
        .lean();

      if (!model_img)
        throw new Error("No se encontro la imágen en el documento");

      const imgPath = join(__dirname, "..", ...model_img.split("/"));

      const exists = fs.existsSync(imgPath);

      if (!exists) throw new Error("El archivo no existe");

      fs.unlinkSync(imgPath);

      await model.findByIdAndUpdate(id, { $unset: { img: 1 } });

      // if (collection === "user") {
      //   await require(`../models/${collection + ".model"}`).findOneAndUpdate(
      //     { img: name },
      //     { $unset: { img: 1 } }
      //   );
      // }

      return res.send({ msg: "Imagen eliminada con éxito" });
    } catch (error) {
      next(error);
    }
  },
};
