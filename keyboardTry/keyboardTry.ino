#include <Keyboard.h>
#define btnBlue 3
#define DEBOUNCE 50

bool isKeyReleased;
long lastBtnPress = 0;
void setup() {
  pinMode(btnBlue, INPUT_PULLUP);
  Keyboard.begin();
  Serial.begin(9600);
}

void loop() {
  if(digitalRead(btnBlue) == HIGH)
  {
    isKeyReleased = true;
  }
  if(digitalRead(btnBlue) == LOW&& millis() - lastBtnPress > DEBOUNCE  && isKeyReleased) 
  {
    isKeyReleased = false;
    Keyboard.write('p');
    //delay(100);
    Keyboard.release('p');
  }
}
