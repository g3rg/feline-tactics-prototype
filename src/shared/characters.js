export const characters = {
    "Bob": {
        level: 1, maxHealth: 100, name: 'Bob',
        healing: 25, maxPower: 50, attack: 50, defense: 50,
        img: 'assets/bob.png',
        imgSrc: 'http://www.avatarsinpixels.com/minipix/eyJTb2NrcyI6IjUiLCJTaG9lcyI6IjQiLCJQYW50cyI6IjMiLCJKYWNrZXQiOiIyIn0=/1/show.png',
        specials: {
            'Slam Attack': {
                desc: 'Perform a single attack using all your power!',
                attacks: 1,
                attackMultiplier: 1.75
            }
        }
    },
    "Bobinia": {
        level: 1, maxHealth: 90, name: 'Bobinia',
        healing: 30, maxPower: 50, attack: 55, defense: 45,
        img: 'assets/bobinia.png',
        imgSrc: 'http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiIxOCIsIkJvZHkiOiIyIiwiRXllcyI6IjIyIiwiTW91dGgiOiIxMSIsIlNvY2tzIjoiMTYiLCJTaG9lcyI6IjUiLCJHbG92ZXMiOiIxIiwiUGFudHMiOiIxIiwiVG9wIjoiMTYiLCJKYWNrZXQiOiIyIiwiSGFpciI6IjIzIiwiZXllc1RvbmUiOiIzMzYzZTAiLCJleWVzVG9uZTIiOiI3NDFlNTgiLCJtYXNrVG9uZSI6IjA5YTJiMiIsImhhaXJUb25lIjoiOGJhNWJkIiwiaGFpclRvbmUyIjoiMjI2MDAyIiwidW5kZXJ3ZWFyVG9uZSI6IjQzYzY0YyIsInVuZGVyd2VhclRvbmUyIjoiNjlkMzlhIiwicGFudHNUb25lIjoiZDgzZjE1IiwicGFudHNUb25lMiI6ImM0N2MzNSIsInRvcFRvbmUiOiJmYmY3YWQiLCJ0b3BUb25lMiI6ImU5ZDQ4OCIsIndpbmdzVG9uZSI6Ijg5MzNkNSIsIndpbmdzVG9uZTIiOiJkYzhlN2EiLCJzaG9lc1RvbmUiOiIyOGM2NTEiLCJzb2Nrc1RvbmUiOiI5YzMyYmUiLCJzb2Nrc1RvbmUyIjoiYWJlYzBlIiwiZ2xvdmVzVG9uZSI6ImYxNmRiMCIsImdsb3Zlc1RvbmUyIjoiNDEzZjBlIiwiaGF0VG9uZSI6ImFiMzM0YSIsImhhdFRvbmUyIjoiZWZmY2Q1IiwiY2FwZVRvbmUiOiI3ZDg5YTQiLCJjYXBlVG9uZTIiOiIyYTI1M2MiLCJiZWx0VG9uZSI6ImMzNmE0NyIsImphY2tldFRvbmUiOiI5YTJhMzYiLCJqYWNrZXRUb25lMiI6ImQzNDg0MiIsIm5lY2tUb25lIjoiM2Q3ZDUwIiwibmVja1RvbmUyIjoiNTc3NGEyIn0=/1/show.png',
        specials: {
            'Drain Attack': {
                desc: "A greater attack that doesn't use all your power!",
                attacks: 1,
                attackMultiplier: 1.5,
                powerDrain: 35
            }
        }
    },
    "Charlie": {
        level: 1, maxHealth: 80, name: 'Charlie',
        healing: 35, maxPower: 50, attack: 50, defense: 55,
        img: 'assets/charlie.png',
        imgSrc: 'http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiIxMiIsIkJvZHkiOiIxIiwiRXllcyI6IjEyIiwiTW91dGgiOiI4IiwiU29ja3MiOiI2IiwiU2hvZXMiOiIyIiwiR2xvdmVzIjoiMyIsIlBhbnRzIjoiMyIsIkphY2tldCI6IjIiLCJIYWlyIjoiOSIsImV5ZXNUb25lIjoiMTIxNTllIiwiZXllc1RvbmUyIjoiNDMwNjExIiwibWFza1RvbmUiOiIwYzkzNTciLCJoYWlyVG9uZSI6IjVkNThmMCIsImhhaXJUb25lMiI6IjJhZGQ1ZSIsInVuZGVyd2VhclRvbmUiOiIzMjQ5NmYiLCJ1bmRlcndlYXJUb25lMiI6ImQyZDNmZCIsInBhbnRzVG9uZSI6IjdjOTM2NCIsInBhbnRzVG9uZTIiOiI1NzhkYzQiLCJ0b3BUb25lIjoiMTAxNjhiIiwidG9wVG9uZTIiOiI3OTQ0YzUiLCJ3aW5nc1RvbmUiOiIxY2I2YjYiLCJ3aW5nc1RvbmUyIjoiNGI5YjAwIiwic2hvZXNUb25lIjoiODJlYmVkIiwic29ja3NUb25lIjoiZjI0ZjJlIiwic29ja3NUb25lMiI6IjllOGJmYiIsImdsb3Zlc1RvbmUiOiJiMDMzM2YiLCJnbG92ZXNUb25lMiI6IjRiYmJlMyIsImhhdFRvbmUiOiIxMGMzYzQiLCJoYXRUb25lMiI6IjAyNmZmYiIsImNhcGVUb25lIjoiYzkyMjRiIiwiY2FwZVRvbmUyIjoiZjZkNGM2IiwiYmVsdFRvbmUiOiI4MWJhODkiLCJqYWNrZXRUb25lIjoiY2I4MDc1IiwiamFja2V0VG9uZTIiOiI3YjI3NGEiLCJuZWNrVG9uZSI6ImNlYjAxOSIsIm5lY2tUb25lMiI6IjNiOWZkMiJ9/1/show.png',
        specials: {
            'Double Attack': {
                desc: 'Perform 2 quick attacks!',
                attacks: 2,
                attackMultiplier: 0.75
            }
        }
    }
}
