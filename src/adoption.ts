import {
  PetAdopted as PetAdoptedEvent,
  PetFed as PetFedEvent,
  Withdraw as WithdrawEvent
} from "../generated/Adoption/Adoption"
import { PetAdopted, PetFed, Withdraw } from "../generated/schema"

export function handlePetAdopted(event: PetAdoptedEvent): void {
  let entity = new PetAdopted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.adopter = event.params.adopter
  entity.petId = event.params.petId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePetFed(event: PetFedEvent): void {
  let entity = new PetFed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.feeder = event.params.feeder
  entity.petId = event.params.petId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
