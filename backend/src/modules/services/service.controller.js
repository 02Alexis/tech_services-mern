import * as serviceModule from "./service.service.js";

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
      await serviceModule.createService(
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
      await serviceModule.getServices();

    res.json(data);

  };

export const getOne =
  async (req, res) => {

    const data =
      await serviceModule.getServiceById(
        req.params.id
      );

    res.json(data);

  };

export const update =
  async (req, res) => {

    const data =
      await serviceModule.updateService(
        req.params.id,
        req.body
      );

    res.json(data);

  };

export const remove =
  async (req, res) => {

    await serviceModule.deleteService(
      req.params.id
    );

    res.json({
      message: "Eliminado"
    });

  };

// 
export const changeStatus =
  async (req, res) => {

    try {

      const service =
        await serviceModule.updateStatus(
          req.params.id,
          req.body.status,
          req.user.id
        );

      res.json(service);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

  };

// 
export const createObservation =
  async (req, res) => {

    const service =
      await serviceModule.addObservation(
        req.params.id,
        req.body.text
      );

    res.json(service);

  };

  // Dashboard Controller
export const dashboard =
  async (req, res) => {

    const stats =
      await serviceModule.getDashboardStats();

    res.json(stats);

  };

// Controller búsqueda
export const search =
  async (req, res) => {

    const page =
      Number(
        req.query.page
      ) || 1;

    const limit =
      Number(
        req.query.limit
      ) || 10;

    const searchText =
      req.query.search || "";

    const status =
      req.query.status || "";

    const data =
      await serviceModule.searchServices(
        page,
        limit,
        searchText,
        status
      );

    res.json(data);

  };

// historial completo 
export const timeline =
  async (req, res) => {

    try {

      const data =
        await serviceModule.getTimeline(
          req.params.id
        );

      res.json(data);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: error.message
      });

    }

  };