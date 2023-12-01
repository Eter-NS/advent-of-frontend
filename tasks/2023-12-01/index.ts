export class GiftRegistry {
  private giftsMap = new Map<number, Array<string>>();

  addGift(childId: number, gift: string): void {
    const giftList = this.giftsMap.get(childId);
    giftList
      ? this.giftsMap.set(childId, [...giftList, gift])
      : this.giftsMap.set(childId, [gift]);
  }

  removeGift(childId: number, gift: string): void {
    const giftList = this.giftsMap.get(childId);

    if (!giftList) throw new Error("Child not found");

    const index = giftList.indexOf(gift);
    if (index === -1) throw new Error("Gift not found");

    giftList.splice(index, 1);
    this.giftsMap.set(childId, giftList);
  }

  getGiftsForChild(index: number): Array<string> | undefined {
    return this.giftsMap.get(index);
  }
}
