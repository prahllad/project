import { GojiraBackendPage } from './app.po';

describe('gojira-backend App', function() {
  let page: GojiraBackendPage;

  beforeEach(() => {
    page = new GojiraBackendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
