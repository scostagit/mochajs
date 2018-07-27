var assert = require('assert');
var should =  require('chai').should();
var chai= require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var authController= require('../controllers/auth.controller');
var sinon = require('sinon');

describe('Basic Mocha test',function(){
    it('should throws erros',function(){ 
         //two ways to throw exectpion:
        //first
        /*try {
            assert.equal(0,3);   
        }catch(e){
            console.log(e);
        }*/

    //when you throw an expection your test breacking
    // throw({message:'it does not working.'});
       
    });
});



describe('Using Chai to Test',function(){
    describe('should deal with object',function(){
        var obj = {name:'Jonh', gender:'male'};
        it('Should have the property name',function(){
            obj.should.have.property('name'); //why should is working here? becaus e when we referenced it in any file, it will be global.
        });

        it('Should have the property name and Jonh',function(){
            obj.should.have.property('name').equal('Jonh');
        });

        it('the objects should be equals',function(){
            var objB = {name:'Jonh', gender:'male'};
            //obj.should.equal(objB); //it won't work. this test will failed.
            obj.should.deep.equal(objB); //I have to use deep.
        });

        it('should allow testing null',function(){
           var iAmNull = null;
          should.not.exist(iAmNull);
           
        }); 
    });


    describe('isAuthorizedPromise',function(){           
        it('it should return false is not authorized',function(){
            authController.setRoles(['user']);
           return  authController.isAuthorizedPromise('admin').should.eventually.be.false;
        });
    });

    describe('getIndex',function(){
        it('should render index',function(){
            var req = {};
            var res = {
                render: sinon.spy()
            };

            authController.getIndex(req,res);
            //console.log(res.render);
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].equal('index');

        });
    });

    describe('isAuthorized',function(){   
        var user = {};
        
        beforeEach(function(){
            user = {
                roles:['user'],
                isAuthorized:function(neededRole){
                    return this.roles.indexOf(neededRole)>=0;
                }
            };

            sinon.spy(user,'isAuthorized');
            authController.setUser(user);
        });
        
        it('it should return false is not authorized',function(){
            //var isAuth = authController.isAuthorized('admin');
            console.log(user);
            user.isAuthorized.calledOnce.should.be.false;
           // expect(isAuth).to.be.false;
        });
    });

    //stub replaces a function  
    describe.only('isAuthorized with Stub',function(){   
        var user = {};
        
        beforeEach(function(){
            user = {
                roles:['user'],
                isAuthorized:function(neededRole){
                    console.log('isAuthorized: pass here sergio');
                    return this.roles.indexOf(neededRole)>=0;
                }
            };

           
            authController.setUser(user);
        });
        
        it('it should return false is authorized',function(){
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true); //replaces functions. I won't print "passed here sergio"
           //var isAuth =  sinon.stub(user, 'isAuthorized').throws(); //throws exception: //sinon.stub(user, 'isAuthorized').throws('ObjNotDefined');
            var req = {user:user};
            var res = {
                render: sinon.spy()
            };

            authController.getIndex(req,res);
            isAuth.calledOnce.should.be.true;
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.be.equal('index');          
        });

        it.only('using mock',function(){
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true); 
            var req = {user:user};
            var res = {
                render: function(){}
            };

            var mock = sinon.mock(res);
            mock.expects('render').once().withArgs('index');

            console.log(mock);

            authController.getIndex(req,res);
            isAuth.calledOnce.should.be.true;
            
            mock.verify();
        });
    });
});


