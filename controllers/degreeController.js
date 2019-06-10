const self = module.exports = {
    index:(req,res)=>{
        req.con.query("SELECT * FROM degree", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });   
    },
    create:(req,res)=>{
        try{
            req.con.query(`INSERT INTO degree (name,timeToFinish,semesters) VALUES ('${req.body.name}','${req.body.timeToFinish}','${req.body.semesters}')`, function (err, result, fields) {
            if (err){
                res.json(false);
            }
            res.json(true);
            }); 

        }catch(e){
            res.json(false);
        }  
    },
    update:(req,res)=>{
        try{
            req.con.query(`UPDATE degree 
                            SET name='${req.body.name}',
                                timeToFinish='${req.body.timeToFinish}',
                                semesters='${req.body.semesters}' WHERE degree_Id ='${req.body.degree_Id}'`, 
            function (err, result, fields) {
            if (err){
                res.json(false);
            }
            res.json(true);
            }); 

        }catch(e){
            res.json(false);
        }  
    },
    delete:(req,res)=>{
        try{
            req.con.query(`DELETE FROM degree WHERE degree_Id ='${req.body.degree_Id}'`, 
            function (err, result, fields) {
            if (err){
                res.json(false);
            }
            res.json(true);
            }); 

        }catch(e){
            res.json(false);
        }  
    }
}