import * as service from "./service.service.js";

import {
  generateServiceCode
} from "../../utils/generateServiceCode.js";

export const create = async (
  req,
  res
) => {

  try {

    const code =
      await generateServiceCode();

    const data = {
      ...req.body,

      code,

      createdBy:
        req.user.id,

      timeline: [
        {
          status: "entry",
          user: req.user.id
        }
      ]
    };

    const result =
      await service.createService(
        data
      );

    res.status(201).json(
      result
    );

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

};

export const getAll =
  async (req, res) => {

    const data =
      await service.getServices();

    res.json(data);

  };

export const getOne =
  async (req, res) => {

    const data =
      await service.getServiceById(
        req.params.id
      );

    res.json(data);

  };

export const update =
  async (req, res) => {

    const data =
      await service.updateService(
        req.params.id,
        req.body
      );

    res.json(data);

  };

export const remove =
  async (req, res) => {

    await service.deleteService(
      req.params.id
    );

    res.json({
      message: "Eliminado"
    });

  };