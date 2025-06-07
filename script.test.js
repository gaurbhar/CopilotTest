// Unit tests for username validation logic in script.js
/**
 * @jest-environment jsdom
 */

describe('Username input validation', () => {
  let input;
  beforeEach(() => {
    // Create a mock input element
    input = document.createElement('input');
    input.type = 'text';
    input.id = 'username';
    document.body.appendChild(input);
    // Attach the event listener (copied from script.js)
    input.addEventListener('input', function () {
      const username = this.value;
      const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{8,})/;
      if (regex.test(username)) {
        this.style.borderColor = 'green';
      } else {
        this.style.borderColor = 'red';
      }
    });
  });
  afterEach(() => {
    document.body.removeChild(input);
  });
  it('should set border to green for valid username', () => {
    input.value = 'Valid1!A';
    input.dispatchEvent(new Event('input'));
    expect(input.style.borderColor).toBe('green');
  });
  it('should set border to red for username without uppercase', () => {
    input.value = 'valid1!a';
    input.dispatchEvent(new Event('input'));
    expect(input.style.borderColor).toBe('red');
  });
  it('should set border to red for username without special char', () => {
    input.value = 'Valid1234';
    input.dispatchEvent(new Event('input'));
    expect(input.style.borderColor).toBe('red');
  });
  it('should set border to red for username without number', () => {
    input.value = 'Valid!Aa';
    input.dispatchEvent(new Event('input'));
    expect(input.style.borderColor).toBe('red');
  });
  it('should set border to red for username less than 8 chars', () => {
    input.value = 'V1!a';
    input.dispatchEvent(new Event('input'));
    expect(input.style.borderColor).toBe('red');
  });
});
