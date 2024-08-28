/**
 * Mocks HTMLDialogElement methods as they are not supported by our test framework at this time.
 */

//error in your text look here
export function mockDialogMethods() {
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
}
