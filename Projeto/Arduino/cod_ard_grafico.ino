  const int PINO_SENSOR_TEMPERATURA = A5;
  float temperaturaCelsius;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  }

void loop() {
  int valorLeitura = analogRead(PINO_SENSOR_TEMPERATURA);
  temperaturaCelsius = ((valorLeitura *  5.0 / 1023.0) / 0.01 ) - 15;

  Serial.print(temperaturaCelsius);
  Serial.println(";");
  delay(2000);
}