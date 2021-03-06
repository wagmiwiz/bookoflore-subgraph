import { BigInt } from "@graphprotocol/graph-ts"
import {
  BookOfLore,
  LoreAdded,
  LoreStruck,
  LoreUpdated,
  NarrativeAdded,
  NarrativeUpdated,
  OwnershipTransferred
} from "../generated/BookOfLore/BookOfLore"
import { Lore } from "../generated/schema"

export function handleLoreAddedUpdated<T>(event: T): void {
  const loreKey = `${event.params.wizardId}-${event.params.loreIdx}`;

  let lore = new Lore(loreKey);

  // Entity fields can be set using simple assignments
  lore.wizardId = event.params.wizardId
  lore.index = event.params.loreIdx

  const contract = BookOfLore.bind(event.address)
  const loreFromContract = contract.loreAt(event.params.wizardId, event.params.loreIdx, event.params.loreIdx)[0];

  lore.assetAddress = loreFromContract.assetAddress;
  lore.loreMetadataURI = loreFromContract.loreMetadataURI;
  lore.tokenId = loreFromContract.tokenId;
  lore.creator = loreFromContract.creator;
  lore.nsfw = loreFromContract.nsfw;
  lore.parentLoreId = loreFromContract.parentLoreId;
  lore.struck = loreFromContract.struck;

  lore.save()
}

export function handleLoreStruck(event: LoreStruck): void {
  const loreKey = `${event.params.wizardId}-${event.params.loreIdx}`;

  let lore = new Lore(loreKey);

  lore.struck = true;

  lore.save()
}


// export function handleNarrativeAdded(event: NarrativeAdded): void {}
//
// export function handleNarrativeUpdated(event: NarrativeUpdated): void {}
//
// export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
