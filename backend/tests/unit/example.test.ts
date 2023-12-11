describe('Calculator', () => {
  it('should receive two numbers and return their sum', () => {
    const firstNumber = 10;
    const secondNumber = 10;

    const sum = firstNumber + secondNumber;

    expect(sum).toBe(20);
  });

  it.todo('should receive two numbers and return their subtraction');
});
