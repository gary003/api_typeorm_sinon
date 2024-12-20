import chai from "chai"
import request from "supertest"
import app from "../../../../../../src/app"
import { expect } from "chai"
import { describe, it } from "mocha"
import { errorValidationUser } from "../../../../../../src/v1/application/routes/user/error.dto"

const urlBase = "/api/v1"

const testUserId: string = "cc2c990b6-029c-11ed-b939-0242ac12002"

describe("Functional Tests API", () => {
  describe("src > v1 > application > route > user > POST", () => {
    it("should add a new user", async () => {
      try {
        const response = await request(app)
          .post(`${urlBase}/user`)
          .send({
            userId: testUserId,
            firstname: "test_Rosita",
            lastname: "test_Espinosa",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)

        expect(response.status).to.be.within(200, 299)
        expect(response.body.data).to.not.be.empty
        expect(response.body.data.userId).to.equal(testUserId)
      } catch (error) {
        chai.assert.fail("unexpected error found in route route > user > POST")
      }
    })
  })

  describe("src > v1 > application > route > user > GET (all users)", () => {
    it("should return an array of all users", async () => {
      try {
        const response = await request(app).get(`${urlBase}/user`).set("Accept", "application/json").expect("Content-Type", /json/)

        expect(response.status).to.be.within(200, 299)
        expect(response.body.data).to.be.an("array")

        if (response.body.data.length > 0) {
          expect(response.body.data[0]).to.have.property("userId")
        }
      } catch (error) {
        chai.assert.fail("unexpected error found in route route > user > GET (all users)")
      }
    })
  })

  describe("src > v1 > application > route > user > GET (single user)", () => {
    it("should return a single user", async () => {
      try {
        const response = await request(app).get(`${urlBase}/user/${testUserId}`).set("Accept", "application/json").expect("Content-Type", /json/)

        expect(response.status).to.be.within(200, 299)
        expect(response.body.data).to.have.property("userId")
      } catch (error) {
        chai.assert.fail("unexpected error found in route route > user > GET (single user)")
      }
    }),
    it("should fail returning a single user ( wrong parameter in route )", async () => {
      try {
        const wrongUserId = 123

        const response = await request(app).get(`${urlBase}/user/${wrongUserId}`).set("Accept", "application/json").expect("Content-Type", /json/)
        
        expect(response.status).to.be.equal(errorValidationUser.errorParamUserId!.httpCode)
        expect(response.text).to.include(errorValidationUser.errorParamUserId!.message)
      } catch (error) {
        // console.log({error})
        chai.assert.fail("Unexpected error- Should not found that userId")
      }
    })
  })

  describe("src > v1 > application > route > user > DELETE", () => {
    it("should delete a specified user", async () => {
      try {
        const response = await request(app).delete(`${urlBase}/user/${testUserId}`).set("Accept", "application/json").expect("Content-Type", /json/)

        expect(response.status).to.be.within(200, 299)
        expect(response.body.data).to.not.be.null
      } catch (error) {
        chai.assert.fail("unexpected error found in route route > user > DELETE")
      }
    })
  })
})

/*
// DB query to clean in case of problems
DELETE FROM `wallet`
WHERE `userId` in (SELECT userId FROM `user` WHERE firstname LIKE '%test%');

DELETE FROM `user`
WHERE firstname LIKE '%test%';
*/