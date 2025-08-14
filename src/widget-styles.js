export const widgetStyles = `
  #mototote-widget-root h2 {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  #mototote-widget-root p {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  #mototote-widget-root form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    text-align: left;
  }

  #mototote-widget-root label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  #mototote-widget-root select {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1.1rem;
    font-family: Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif;
    background-color: #fff;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  #mototote-widget-root select:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  #mototote-widget-root input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  #mototote-widget-root input[type="number"] {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1.1rem;
    font-family: Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif;
    background-color: #fff;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  #mototote-widget-root input[type="number"]:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  #mototote-widget-root button {
    padding: 1rem;
    border: none;
    border-radius: 50px;
    background-color: #cc0000;
    color: white;
    font-size: 1.2rem;
    font-family: Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif;
    cursor: pointer;
    margin-top: 1rem;
    width: 100%;
    transition: background-color 0.3s;
  }

  #mototote-widget-root button:hover {
    background-color: #000000;
  }

  #mototote-widget-root .container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  #mototote-widget-root .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #mototote-widget-root .select-button-container {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
  }

  #mototote-widget-root .select-button {
    background-color: #cc0000;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 8px 16px;
    font-family: Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  #mototote-widget-root .select-button:hover {
    background-color: #000000;
  }

  #mototote-widget-root .vehicle-summary {
    text-align: center;
    margin: 2rem 0;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
  }

  #mototote-widget-root .towing-details {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  #mototote-widget-root .motorcycle-details {
    text-align: center;
    margin: 2rem 0;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
  }

  #mototote-widget-root .motorcycle-details ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  #mototote-widget-root .motorcycle-details li {
    margin: 0.5rem 0;
  }

  #mototote-widget-root .carrier-selector {
    text-align: center;
    margin: 2rem 0;
  }

  #mototote-widget-root .carrier-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  #mototote-widget-root .carrier-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #mototote-widget-root .carrier-image {
    flex: 0 0 200px;
    display: flex;
    align-items: center;
  }

  #mototote-widget-root .carrier-image img {
    max-width: 100%;
    height: auto;
  }

  #mototote-widget-root .carrier-details {
    flex: 1;
  }

  #mototote-widget-root .carrier-item h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  #mototote-widget-root .carrier-item ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  #mototote-widget-root .carrier-item li {
    margin: 0.25rem 0;
  }

  #mototote-widget-root .carrier-item a {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background: #cc0000;
    color: white;
    text-decoration: none;
    border-radius: 25px;
  }

  #mototote-widget-root .carrier-item a:hover {
    background: #000000;
  }

  #mototote-widget-root .helper-text {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.25rem;
  }
`;
