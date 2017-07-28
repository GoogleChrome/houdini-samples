/*
Copyright 2016 Google, Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
registerAnimator('expand', class ExpandAnimator {
  constructor(options) {
    this.options = options;
  }

  animate(currentTime, effect) {
    // TODO(flackr): Control transition through input.
    // TODO(flackr): Use non-linear transition.
    var repeatTime = currentTime * 0.001 % 5;
    var t = 0;
    if (repeatTime < 2)
      t = Math.max(0, repeatTime - 1);
    else if (repeatTime > 3)
      t = Math.max(0, 4 - repeatTime);
    else
      t = 1;

    var clip = effect.children[0];
    var content = effect.children[1];
    var offset = effect.children[2];
    var small = effect.children[3];
    var large = effect.children[4];
    var expandScale = this.options.expandScale;
    var scale = (expandScale - 1) * t + 1;

    clip.localTime = t;
    offset.localTime = t;

    // Counter-scale the content elements.
    var counterScale = 1 / scale;
    var maxCounterScale = 1 / expandScale;
    content.localTime = (counterScale - 1) / (maxCounterScale - 1);

    // Crossfade between small and large.
    small.localTime = t;
    large.localTime = t;
  }

});