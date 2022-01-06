import { Roles } from '../game/role.js';

export default class OnuwGame {
	/** @type {number} */
	playerID;

	/**
	 * @type {string[]}
	 */
	#players;

	/**
	 * @type {Map<Roles, number>}
	 */
	#roles;

	/**
	 * @type {number}
	 */
	#numRoles;

	constructor() {
		this.playerID = NaN;
		this.#players = [];
		this.#roles = new Map();
		this.#numRoles = 0;
	}

	reset() {
		this.playerID = NaN;
		this.#players = [];
		this.#roles = new Map();
		this.#numRoles = 0;
	}

	get isHost() {
		return this.playerID === 0;
	}

	/**
	 * @param {number} id
	 * @param {string} name
	 */
	addPlayer(id, name) {
		this.#players[id] = name;
	}

	/**
	 * @param {Roles} roleID
	 */
	addRole(roleID) {
		const t = this.#roles.get(roleID);
		this.#numRoles++;
		if (t === undefined) {
			this.#roles.set(roleID, 1);
		} else {
			this.#roles.set(roleID, t + 1);
		}
	}

	/**
	 * @param {Roles} roleID
	 */
	removeRole(roleID) {
		const t = this.#roles.get(roleID);
		if (t === undefined) {
			return;
		} else {
			this.#numRoles--;
			if (t <= 1) {
				this.#roles.delete(roleID);
				return;
			}
			this.#roles.set(roleID, t - 1);
		}
	}

	/**
	 * @param {Roles} roleID
	 * @returns {number}
	 */
	numRole(roleID) {
		const d = this.#roles.get(roleID);
		if (d === undefined) { return 0; }
		return d;
	}
}
