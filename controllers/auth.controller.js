function AuthController (){

    var roles;
    function setRoles(role){
        roles  = role;
    }

    var user;
    function setUser(inUser){
        user = inUser;
    }

    function isAuthorized(neededRole){
        console.log("passed here sergio")
        if(user){
            return user.isAuthorized(neededRole);
        }
       
    }

   /* function isAuthorized(neededRole){
        return roles.indexOf(neededRole)>=0;
    }*/

    function isAuthorizedAsyn(neededRole, cb){
       setTimeout(function(){ cb(roles.indexOf(neededRole)>=0)}, 2100);
    }

    function isAuthorizedPromise(neededRole, cb){
        return new Promise(function(resolve){
            setTimeout(function(){ cb(roles.indexOf(neededRole)>=0)},0);
        });
       
     }

     function getIndex(req,res){
       try{          
            if(req.user.isAuthorized('admin')){
                return res.render('index');
            }
            res.render('not Authorized');
       }catch(e){
             res.render('error');
       }
        
        // res.render('index');
     }
    return {isAuthorized, isAuthorizedAsyn, setRoles,setUser, isAuthorizedPromise, getIndex};
}

module.exports = AuthController();