<script setup>
defineProps({
	workoutData: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="card border-0 shadow-sm rounded-4 h-100">
		<div class="card-body p-4">
			<div class="d-flex justify-content-between align-items-start mb-3">
				<div class="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
					<i class="bi bi-activity fs-4"></i>
				</div>

				<span class="badge rounded-pill text-capitalize px-3 py-2" :class="workoutData.status === 'Completed' ? 'bg-success' : 'bg-warning'">
					{{ workoutData.status }}
				</span>
			</div>

			<h5 class="fw-bold mb-3">
				{{ workoutData.name }}
			</h5>

			<p class="text-secondary mb-4">
				<i class="bi bi-clock me-2"></i>
				{{ workoutData.duration }} minutes
			</p>

			<button class="btn btn-outline-primary w-100">
				View Workout
				<i class="bi bi-arrow-right ms-2"></i>
			</button>
		</div>
	</div>
</template>
