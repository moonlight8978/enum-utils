import { enumerize } from '../src/enumerize'

describe('string enum', () => {
  enum genderEnum {
    male = '01',
    female = '02',
    unknown = '03',
  }

  const genderEnumHelpers = enumerize<typeof genderEnum, true>(genderEnum, {
    name: 'genders',
    modelName: 'user',
  })

  describe('keys', () => {
    it('returns keys', () => {
      expect(genderEnumHelpers.keys).toIncludeSameMembers(['male', 'female', 'unknown'])
    })
  })

  describe('values', () => {
    it('returns values', () => {
      expect(genderEnumHelpers.values).toIncludeSameMembers(['01', '02', '03'])
    })
  })

  describe('getName()', () => {
    it('returns enum key', () => {
      expect(genderEnumHelpers.getName(genderEnum.female)).toEqual('female')
      expect(genderEnumHelpers.getName(genderEnum.male)).toEqual('male')
    })

    it('returns null for null', () => {
      expect(genderEnumHelpers.getName(null)).toEqual(null)
    })
  })

  describe('getText()', () => {
    const texts = {
      'domain.user.genders.female': 'FEMALE',
      'domain.user.genders.male': '',
      'profileScreen.user.genders.female': '女',
    }
    const t = (key: string): string | null | undefined => texts[key]

    it('returns translated text', () => {
      expect(genderEnumHelpers.getText(genderEnum.female, { t, fallback: 'fe-male' })).toEqual('FEMALE')
    })

    it('returns fallback text if enum value is null', () => {
      expect(genderEnumHelpers.getText(null, { t, fallback: 'fe-male' })).toEqual('fe-male')
    })

    it('returns empty if no fallback provided', () => {
      expect(genderEnumHelpers.getText(null, { t })).toEqual(null)
    })

    it('returns fallback if t function returns empty', () => {
      expect(genderEnumHelpers.getText(genderEnum.male, { t, fallback: 'ma-le' })).toEqual('ma-le')
    })

    it('allows to specify other scope', () => {
      expect(
        genderEnumHelpers.getText(genderEnum.female, {
          t,
          i18nScope: 'profileScreen',
        })
      ).toEqual('女')
    })
  })
})

describe('number enum', () => {
  enum genderEnum {
    male,
    female,
    unknown,
  }

  const genderEnumHelpers = enumerize<typeof genderEnum, true>(genderEnum, {
    name: 'genders',
    modelName: 'user',
  })

  describe('keys', () => {
    it('returns keys', () => {
      expect(genderEnumHelpers.keys).toIncludeSameMembers(['male', 'female', 'unknown'])
    })
  })

  describe('values', () => {
    it('returns values', () => {
      expect(genderEnumHelpers.values).toIncludeSameMembers([0, 1, 2])
    })
  })

  describe('getName()', () => {
    it('returns enum key', () => {
      expect(genderEnumHelpers.getName(genderEnum.female)).toEqual('female')
      expect(genderEnumHelpers.getName(genderEnum.male)).toEqual('male')
    })

    it('returns null for null', () => {
      expect(genderEnumHelpers.getName(null)).toEqual(null)
    })
  })

  describe('getText()', () => {
    const texts = {
      'domain.user.genders.female': 'FEMALE',
      'profileScreen.user.genders.female': '女',
    }
    const t = (key: string): string | null | undefined => texts[key]

    it('returns translated text', () => {
      expect(genderEnumHelpers.getText(genderEnum.female, { t, fallback: 'fe-male' })).toEqual('FEMALE')
    })

    it('returns fallback text if enum value is null', () => {
      expect(genderEnumHelpers.getText(null, { t, fallback: 'fe-male' })).toEqual('fe-male')
    })

    it('returns empty if no fallback provided', () => {
      expect(genderEnumHelpers.getText(null, { t })).toEqual(null)
    })

    it('allows to specify other scope', () => {
      expect(
        genderEnumHelpers.getText(genderEnum.female, {
          t,
          i18nScope: 'profileScreen',
        })
      ).toEqual('女')
    })
  })
})
