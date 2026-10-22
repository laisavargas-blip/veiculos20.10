import { Router } from "express";
import { veiculosServices } from "../services/veiculos.Services.js";
import { cache } from "react";

export const veiculosRouter = Router();

veiculosRouter.get("/", async (req, res) => {
    try {
        const veiculos = await veiculosServices.getall();
        res.json(veiculos);
    }catch (error) {
    
        console.error (error);
    }
});
veiculosRouter.get("/:id", async (req, res) => {
  const veiculoId = req.params.id
  try {
    const veiculo = await veiculosServices.getById(veiculoId);
    res.json(veiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar veículo" });
  }
});
veiculosRouter.delete("/:id", async (req, res) => {
  const veiculoId = req.params.id;
  try {
    await veiculosServices.delete(veiculoId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar veículo" });
  }
});

veiculosRouter.post("/", async (req, res) => {
    try {
        const veiculos = await veiculosServices.create(req.body);
         res.status(201).json(veiculos);
    }catch (error) {
        console.error (error);
    }
});
veiculosRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    try{
        const veiculos = await veiculosServices.update(req.body, id);
         return res.status(200).json(veiculos);  
          
    }catch (error){
      console.error ("deu erro kkk",error)
    }
})