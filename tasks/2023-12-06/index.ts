export class OrderController {
	machines: Machine[] = [];
	registerMachine(newMachine: Machine) {
		if (!("state" in newMachine)) throw new Error("This is not a machine");
		this.machines.push(newMachine);
	}
	setState(newState: string) {
		if (newState === "unknown") throw new Error("Invalid state provided");
		this.machines.forEach((m) => (m.state = newState));
	}
	unregisterMachine(machine: Machine) {
		const index = this.machines.indexOf(machine);
		if (index === -1) {
			throw new Error(
				"Sorry, this machine does not exist in the controller's memory"
			);
		}
		this.machines.splice(index, 1);
	}
}

export class Machine {
	#stateHistory: string[] = [];
	#state: string | null = null;

	get state() {
		return this.#state;
	}

	set state(newState: string | null) {
		if (newState === null) return;
		this.#state = newState;
		this.#stateHistory.push(newState);
	}

	performAudit() {
		if (this.#state === null) return "No recent orders assigned";
		return this.#stateHistory.map((state, index) => {
			return `Order #${index + 1} - ${state}`;
		});
	}
}
