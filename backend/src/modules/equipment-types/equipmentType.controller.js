import * as service from "./equipmentType.service.js";

export const create = async (
  req,
  res
) => {

  try {

    const equipmentType =
      await service.createEquipmentType(
        req.body
      );

    res.status(201).json(
      equipmentType
    );

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

};

export const getAll = async (
  req,
  res
) => {

  const data =
    await service.getEquipmentTypes();

  res.json(data);

};

export const getOne = async (
  req,
  res
) => {

  const data =
    await service.getEquipmentTypeById(
      req.params.id
    );

  res.json(data);

};

export const update = async (
  req,
  res
) => {

  const data =
    await service.updateEquipmentType(
      req.params.id,
      req.body
    );

  res.json(data);

};

export const remove = async (
  req,
  res
) => {

  await service.deleteEquipmentType(
    req.params.id
  );

  res.json({
    message: "Eliminado"
  });

};