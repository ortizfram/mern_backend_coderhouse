const express = require("express");
const { estudianteModel } = require("../models/estudiantes.models");

const router = express.Router();

// Crear estudiante
router.post("/", async (req, res) => {
  try {
    const estudiante = new estudianteModel(req.body);
    await estudiante.save();
    res.status(201).json(estudiante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los estudiantes
router.get("/", async (req, res) => {
  try {
    const estudiantes = await estudianteModel.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un estudiante por su id
router.get("/:id", async (req, res) => {
  try {
    const estudiante = await estudianteModel.findById(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estudiante por su id
router.put("/:id", async (req, res) => {
  try {
    const estudiante = await estudianteModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar estudiante por su id
router.delete("/:id", async (req, res) => {
  try {
    const estudiante = await estudianteModel.findByIdAndDelete(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    res.json({ message: "Estudiante eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {studentRouter:router};
