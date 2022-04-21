<template>
  <div class="slide-cont">
    <div id="myCarousel" class="carousel slide mb-0" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/b1.jpg" alt="" srcset="" />
        </div>
        <div class="carousel-item">
          <img src="@/assets/b2.jpg" alt="" srcset="" />
        </div>
        <div class="carousel-item">
          <img src="@/assets/b3.jpg" alt="" srcset="" />
        </div>
        <div class="carousel-item">
          <img src="@/assets/b4.jpg" alt="" srcset="" />
        </div>
        <div class="carousel-item">
          <img src="@/assets/b5.jpg" alt="" srcset="" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">السابق</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">التالي</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.slide-cont {
  width: 100%;
}
/* Carousel base class */
.carousel {
  margin-bottom: 4rem;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

/* Declare heights because of positioning of img element */
.carousel-item {
  height: 100vh;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  height: 100vh;
}
</style>
