const { Types } = require("mongoose");
const { Service } = require("../models");
const { uploadFile } = require("../helpers");
const fs = require("fs");
const path = require("path");

module.exports = {
  getServices: async (req, res, next) => {
    try {
      const { page, limit } = req.query;

      const { category } = req.params;

      const query = { status: true };

      if (category) query.category = new Types.ObjectId(category);

      const services = await Service.find(query)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .populate({
          path: "category",
          select: "-state",
        })
        .populate({
          path: "provider",
          select: "-password -status -role -google -providerData",
        })
        .select("-category -provider");

      return res.send({ msg: "ok", services });
    } catch (error) {
      next(error);
    }
  },
  createService: async (req, res, next) => {
    try {
      const { name, category, price, description, durationOptions } = req.body;

      const exist = await Service.findOne({
        name,
        provider: req.uid.toString(),
      });

      if (exist) throw new Error("El servicio ya existe");

      const service = new Service({
        name,
        category,
        price,
        description,
        durationOptions,
        provider: req.uid,
      });

      await service.save();

      if (req.files) {
        service.img =
          "/uploads/service/" +
          (await uploadFile({ files: req.files, folder: "service" }));

        await service.save();
      }

      return res.send({ msg: "¡Se ha creado el servicio con exito!", service });
    } catch (error) {
      next(error);
    }
  },
  updateService: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, category, price, description, durationOptions } = req.body;

      const service = await Service.findByIdAndUpdate(
        id,
        {
          name,
          category,
          price,
          description,
          durationOptions,
        },
        { new: true }
      );

      if (!service) {
        return res.status(404).send({ msg: "Servicio no encontrado" });
      }

      if (req.files) {
        const pathFile = path.join(__dirname, "..", service.img);

        const fileExist = fs.existsSync(pathFile);

        if (fileExist) fs.unlinkSync(pathFile);

        service.img =
          "/uploads/service/" +
          (await uploadFile({ files: req.files, folder: "service" }));

        await service.save();
      }

      return res.send({ msg: "¡Actualizado con exito!", service });
    } catch (error) {
      next(error);
    }
  },
};
