interface LetterArrayModel<T> {
  value: T;
  priority: number;
}
export class ChristmasQueue<T> {
  private letterArray: Array<LetterArrayModel<T>> = [];

  enqueue(value: T, priority: number) {
    const letter: LetterArrayModel<T> = {
      value,
      priority,
    };

    if (this.letterArray.length === 0) {
      this.letterArray.push(letter);
      return;
    }

    const checkPriority = (priority: number) => {
      let lastIndexBeforeInsertion = -1;
      this.letterArray.forEach(({ priority: assignedPriority }, index) => {
        if (assignedPriority === priority) lastIndexBeforeInsertion = index;
      });
      return lastIndexBeforeInsertion;
    };

    const assignLetter = (indexBeforeInsertion: number) => {
      this.letterArray.splice(indexBeforeInsertion + 1, 0, letter);
    };

    let lastIndexBeforeInsertion = checkPriority(priority);
    if (lastIndexBeforeInsertion !== -1) {
      assignLetter(lastIndexBeforeInsertion);
      return;
    }

    const highestPriority = this.letterArray[0].priority;
    const lowestPriority = (this.letterArray.at(-1) as LetterArrayModel<T>)
      .priority;

    if (priority > highestPriority) {
      assignLetter(lastIndexBeforeInsertion);
      return;
    } else if (priority < lowestPriority) {
      this.letterArray.push(letter);
      return;
    }

    // last resort
    for (
      let currPriority = priority + 1; // adding one, because it would not have any sense to iterate two times on the same priority
      currPriority <= highestPriority;
      currPriority++
    ) {
      lastIndexBeforeInsertion = checkPriority(currPriority);
      if (lastIndexBeforeInsertion > -1) {
        assignLetter(lastIndexBeforeInsertion);
        return;
      }
    }
  }

  dequeue(): T {
    const letter = this.letterArray.shift()?.value;

    if (letter) return letter;
    throw new Error("There are no letters in the queue!");
  }

  isEmpty(): boolean {
    return !this.letterArray.length;
  }
}

const pq = new ChristmasQueue();
pq.enqueue("lowPriority", 1);
pq.enqueue("highPriority", 3);
pq.enqueue("mediumPriority", 2);
pq.enqueue("highPriority", 3);
pq.enqueue("lowPriority", 1);
