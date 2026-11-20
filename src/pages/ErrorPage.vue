<template>
	<section id="error">
		<div class="container">
			<div class="row justify-content-center align-items-center text-center py-5">
				<div class="col-md-8 col-lg-6">
					<h1 class="display-1 fw-bold text-primary">404</h1>

					<h2 class="fw-bold mb-3">Page Not Found</h2>

					<p class="text-secondary mb-4">Oops! The page you're looking for doesn't exist or may have been moved.</p>

					<router-link :to="{ name: 'Home' }" class="btn btn-primary btn-lg px-4">
						<i class="bi bi-house-door me-2"></i>
						Back to Home
					</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
#error .row {
	min-height: 95vh;
}
</style>
