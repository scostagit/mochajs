
var assert = require('assert');
var expect = require('chai').expect;
var should =  require('chai').should();
var authController= require('../../controllers/auth.controller');

/*
CHAI: is a js library which offers more possiblities to test.
 */

before(function(){
     console.log('running before each');
});

describe('AuthController',function(){   
    beforeEach(function(){
        console.log('running before each');
        authController.setRoles(['user']);
    });

    describe('isAuthorized  ',function(){
      
        it('it should return false if not authorized',function(){          
           var isAuth  = authController.isAuthorized('admin');
           //expect comes from chai libray.
            expect(isAuth).to.be.false;           
        });  
        
        it('it should return true is authorized',function(){
            authController.setRoles(['user','admin']);
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.true;
        });
      
    });   
});