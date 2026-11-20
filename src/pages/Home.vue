<template>
	<section id="landing">
		<div class="container">
			<div class="row align-items-center py-5">
				<div class="col-lg-6 text-center text-lg-start">
					<span class="badge bg-primary mb-3 px-3 py-2"> YOUR FITNESS JOURNEY STARTS HERE </span>

					<h1 class="display-3 fw-bold mb-3">Train Hard. <span class="text-primary">Track Progress.</span> Stay Strong.</h1>

					<p class="lead text-secondary mb-4">Take control of your fitness journey with FitForge. Track your workouts, monitor your progress, and stay motivated to become a stronger version of yourself.</p>

					<router-link :to="{ name: 'Login' }" class="btn btn-primary btn-lg px-4">
						Get Started
						<i class="bi bi-arrow-right ms-2"></i>
					</router-link>
				</div>

				<div class="col-lg-6 mt-5 mt-lg-0">
					<img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48" alt="Gym workout" class="img-fluid rounded-4 shadow" />
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
#landing .row {
    min-height: 95vh;
}
</style>