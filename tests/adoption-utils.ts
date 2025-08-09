import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { PetAdopted, PetFed, Withdraw } from "../generated/Adoption/Adoption"

export function createPetAdoptedEvent(
  adopter: Address,
  petId: string,
  amount: BigInt
): PetAdopted {
  let petAdoptedEvent = changetype<PetAdopted>(newMockEvent())

  petAdoptedEvent.parameters = new Array()

  petAdoptedEvent.parameters.push(
    new ethereum.EventParam("adopter", ethereum.Value.fromAddress(adopter))
  )
  petAdoptedEvent.parameters.push(
    new ethereum.EventParam("petId", ethereum.Value.fromString(petId))
  )
  petAdoptedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return petAdoptedEvent
}

export function createPetFedEvent(
  feeder: Address,
  petId: string,
  amount: BigInt
): PetFed {
  let petFedEvent = changetype<PetFed>(newMockEvent())

  petFedEvent.parameters = new Array()

  petFedEvent.parameters.push(
    new ethereum.EventParam("feeder", ethereum.Value.fromAddress(feeder))
  )
  petFedEvent.parameters.push(
    new ethereum.EventParam("petId", ethereum.Value.fromString(petId))
  )
  petFedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return petFedEvent
}

export function createWithdrawEvent(owner: Address, amount: BigInt): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEvent
}
