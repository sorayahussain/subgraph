import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { PetAdopted } from "../generated/schema"
import { PetAdopted as PetAdoptedEvent } from "../generated/Adoption/Adoption"
import { handlePetAdopted } from "../src/adoption"
import { createPetAdoptedEvent } from "./adoption-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let adopter = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let petId = "Example string value"
    let amount = BigInt.fromI32(234)
    let newPetAdoptedEvent = createPetAdoptedEvent(adopter, petId, amount)
    handlePetAdopted(newPetAdoptedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("PetAdopted created and stored", () => {
    assert.entityCount("PetAdopted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PetAdopted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "adopter",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "PetAdopted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "petId",
      "Example string value"
    )
    assert.fieldEquals(
      "PetAdopted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
