const { Types } = require("mongoose");
const { Service } = require("../models");

module.exports = {
  getServices: async (req, res, next) => {
    try {
      const { page, limit } = req.query;

      const { category, provider } = req.body;

      const query = {};

      if (provider) query.provider = new Types.ObjectId(provider);
      if (category) query.category = new Types.ObjectId(category);

      const services = await Service.aggregate([
        { $match: { status: true, ...query } },
        { $skip: (Number(page) - 1) * Number(limit) },
        { $limit: Number(limit) },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category_details",
            pipeline: [{ $project: { state: 0 } }],
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "provider",
            foreignField: "_id",
            as: "provider_details",
            pipeline: [
              {
                $project: {
                  password: 0,
                  status: 0,
                  role: 0,
                  google: 0,
                  providerData: 0,
                },
              },
            ],
          },
        },
        { $project: { category: 0, provider: 0 } },
      ]);

      return res.send({ msg: "ok", services });
    } catch (error) {
      next(error);
    }
  },
};
