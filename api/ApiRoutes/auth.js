import express from 'express';
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("這邊是authApi End points連接點");
})

export default router;