export class VictimExistsError extends Error {
    constructor() {
        super('there is already a victim in the database')
    }
}

export class NoVictimOrCitizenExistError extends Error {
    constructor() {
        super('there is no victim or citizen')
    }
}

export class SameDistanceFromVictimError extends Error {
    constructor() {
        super(
            'there are at least two citizens at the same distance from the victim'
        )
    }
}
