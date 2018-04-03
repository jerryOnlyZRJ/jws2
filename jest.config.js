module.exports = {
    testMatch: ['<rootDir>/tests/*.spec.js'],
    coverageDirectory: '<rootDir>/docs/coverage',
    coverageThreshold: { // 测试覆盖率, 阈值不满足，就返回测试失败
        global: {
            branches: 50,
            functions: 90,
            lines: 90,
            statements: 90
        }
    }
}